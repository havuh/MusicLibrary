import FormModule from "../../modules/Form/FormModule";
import s from "./styles.module.scss";

const prefix = "p-login";

const LoginPage = () => {
  return (
    <div className={s[prefix]}>
      <FormModule />
    </div>
  );
};

export default LoginPage;
