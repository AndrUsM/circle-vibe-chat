import {
  ExtendedReactFunctionalComponent,
  StackLayout,
} from "@circle-vibe/components";
import { SignUpForm } from "@features/users/components/sign-up-form";

export const SignUp: ExtendedReactFunctionalComponent = () => {
  return (
    <div className="form-centered py-10 bg-tertiary">
      <div className="p-3 min-w-80">
        <StackLayout space="0.5rem">
          <p className="text-secondary text-center text-3xl font-semibold">
            Sign-up
          </p>

          <SignUpForm />
        </StackLayout>
      </div>
    </div>
  );
};
