import * as Yup from "yup";
import { strings } from "../../common/i18n";
import { COUNTRY_CODES } from "../../common/constants";

export const nameSchema: any = Yup.string().required(strings("required")).matches(/^[A-Za-z\s]+$/, strings("InstallerValidation.enterValidName"));

export const emailIdSchema: any = Yup.string().required(strings("required")).email(strings("Register.enterValidEmail"));

export const passwordSchema: any = Yup.string()
  .required(strings("required"))
  .min(8, (strings("Register.minChar")))
  .matches(/[A-Z]/, (strings("Register.uppercaseChar")))
  .matches(/^\S.*[^\s]$/, (strings("Register.spaceValidation")))
  .matches(/\d+|[!@#$%&*^]+/, (strings("Register.numOrSpecialchar")))
  .test(
    "password",
    strings("Register.notNameOrMail"),
    function (value: string) {
      const { given_name } = this.parent;
      const { email } = this.parent;

      return !(value?.toLowerCase() === email?.toLowerCase() || value?.toLowerCase() === given_name?.toLowerCase());
    }
  );
export const registrationValidationSchema: any = Yup.object().shape({
  given_name: nameSchema,
  phone: Yup.string().required(strings("required")).test(
    "length",
    strings("Register.enterValidPhone"),
    function (value: string) {
      const { countryCode } = this.parent;
      const requiredLenth = COUNTRY_CODES.filter((countryCodeObj: any) => countryCodeObj.value === countryCode)[0].mask.length;

      return value ? value.length === requiredLenth : null;
    }
  ),
  email: emailIdSchema,
  password: passwordSchema,
  confirmpassword: Yup.string().required(strings("required")).oneOf([Yup.ref("password")], (strings("Register.passwordMatch")))
})
  ;
