import { ExtendedReactFunctionalComponent } from "@circle-vibe/shared";
import { SignUpForm } from "@features/users/components/sign-up-form";

export const SignUp: ExtendedReactFunctionalComponent = () => {
  return (
    <div className="form-centered py-10">
      <div className="bg-tertiary rounded-1 p-3 min-w-80">
        <SignUpForm />
      </div>
    </div>
  );
};
