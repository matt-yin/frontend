# Issues

- Non-primitive type `Date` exists in Redux state which conflicts with the rule of state. Instead, store the serialized date in the state and de-serialize it when using it in the JavaScript.
- Bug in submitting answer. Submitting answer failed leaving the `FieldSet` enabled again after timeout.
