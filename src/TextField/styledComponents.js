import styled from "styled-components";

const Wrapper = styled.div`
  width: ${props => (props.width ? props.width + "px" : "400px")}
  margin-bottom: 30px
`;
const LabelSection = styled.div`
  display: flex
  justify-content: space-between
  align-items: center
`;

const Label = styled.div`
  font-size: 14px
  color: #414670
  opacity: 0.8
`;

const Error = styled.div`
  font-size: 12px
  color: #ff4141
`;

const Input = styled.input`
  height: 41px
  border: none
  width: ${props => (props.width ? props.width + "px" : "480px")}
  font-size: 16px
  color: #2a3a74
  padding: 0;
  font-family: Lato, Roboto, Arial, sans-serif;
  border-bottom-style: solid
  border-bottom-width: 1px
  border-bottom-color: ${({ isValid, isBlurred }) =>
    !isValid && isBlurred ? `#ff4141;` : `rgba(47, 56, 97, 0.4);`}
  &:focus {
    outline: none
  }
  &::-webkit-input-placeholder {
    color: #414670
    opacity: 0.4
  }
`;

export { Wrapper, Label, LabelSection, Error, Input };
