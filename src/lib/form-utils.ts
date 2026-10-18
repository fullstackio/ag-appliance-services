import type { ControllerFieldState } from "react-hook-form";

/** Don't surface a field's error until the user has actually interacted with it
 * (blurred it, or React Hook Form re-validated it after that first touch). */
export function touchedError(fieldState: ControllerFieldState) {
  return fieldState.isTouched && fieldState.error
    ? [fieldState.error]
    : undefined;
}
