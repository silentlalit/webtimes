import { ClipLoader } from "react-spinners";
import styles from "./Button.module.scss";

const { button, hidden, spinner, type2Button, type3Button } = styles;

type PropsType = {
  title?: string;
  style?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  loading?: boolean;
  btnType?: string;
  icon?: any;
  onClick?: any;
  type?: any;
  disabled?: boolean;
};

const Button = ({
  title,
  style,
  wrapperStyle,
  loading = false,
  btnType = "type1",
  icon,
  onClick,
  type,
  disabled,
}: PropsType): JSX.Element => {
  return (
    <div className={loading ? hidden : undefined} style={wrapperStyle}>
      {loading && (
        <div className={spinner}>
          <ClipLoader color="#36d7b7" />
        </div>
      )}

      <button
        type={type}
        className={`${button} ${btnType === "type2" && type2Button} ${
          btnType === "type3" && type3Button
        }`}
        style={style}
        onClick={onClick}
        disabled={disabled}>
        {icon && icon}
        <span>{title}</span>
      </button>
    </div>
  );
};

export default Button;
