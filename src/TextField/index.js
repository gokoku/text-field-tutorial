import React, { Component } from "react";
import { Wrapper, Label, LabelSection, Error, Input } from "./styledComponents";

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      errorMessage: "",
      isTouchedOnce: false,
      isBlurred: false
    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { value, errorMessage } = this.state;
    const { value: prevValue, errorMessage: prevError } = prevState;
    if (prevValue !== value || prevError !== errorMessage)
      this.props.onChange(value, !errorMessage);
  }
  basicValidation(validator) {
    const { value } = this.state;
    const emailRe = /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const minRe = /min:[0-9]+$/;
    const maxRe = /max:[0-9]+$/;
    switch (validator) {
      case "required":
        return value.length > 0 ? "" : "This value is required";
      case "email":
        return emailRe.test(value) ? "" : "Please enter a valid email";
      case minRe.test(value):
        const min = value.split(":")[1];
        return value.length >= min
          ? ""
          : `This value needs to be at least ${min} characters`;
      case maxRe.text(value):
        const max = value.split(":")[1];
        return value.length <= max
          ? ""
          : `This value cannot be more than ${max} characters`;
      default:
        return null;
    }
  }
  customValidation(validator) {
    return new Promise(async (resolve, reject) => {
      const { value } = this.state;
      if (
        typeof validator === "object" &&
        typeof validator.isValid === "function" &&
        typeof validator.errorMessage === "string"
      ) {
        let isValid;
        if (validator.async) {
          isValid = await validator.isValid(value);
        } else {
          isValid = validator.isValid(value);
        }
        resolve(isValid ? "" : validator.errorMessage);
      }
      reject("Unsupported validator type passed");
    });
  }
  async runValidations() {
    const { isTouchedOnce } = this.state;
    const { validations } = this.props;
    if (!isTouchedOnce) return;
    let validationRes;
    for (let i = 0; i < validations.length; i++) {
      const validator = validations[i];
      if (typeof validator == "string")
        validationRes = this.basicValidation(validator);
      else validationRes = await this.customValidation(validator);
      if (validationRes) break;
    }
    this.setState({
      errorMessage: validationRes || ""
    });
  }
  onChange = event => {
    const { value } = event.currentTarget;
    this.setState(
      {
        value
      },
      this.runValidations
    );
  };

  onFocus = () => {
    this.setState({
      isTouchedOnce: true,
      isBlurred: false
    });
  };

  onBlur = () => {
    this.setState({ isBlurred: true }, this.runValidations);
  };

  render() {
    const { value, errorMessage, isTouchedOnce, isBlurred } = this.state;
    const { type, label, placeholder } = this.props;
    const shouldDisplayError = isTouchedOnce && isBlurred;
    return (
      <Wrapper>
        <LabelSection>
          <Label>{label}</Label>
          {shouldDisplayError && <Error>{errorMessage}</Error>}
        </LabelSection>
        <Input
          type={type || "text"}
          value={value}
          onChange={this.onChange}
          placeholder={placeholder}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          isValid={!errorMessage.length}
          ifBlurred={isBlurred}
        />
        <LabelSection />
      </Wrapper>
    );
  }
}

export default TextField;
