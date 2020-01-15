# Checkout Calculator - Promotional Rules

## Dependencies

This project requires the NodeJS runtime. Please follow the [installation instructions](https://nodejs.org) for your development environment

Install required project dependencies after installing NodeJS by running the following shell command:

```npm install```

## Test

Invoke the test suite by running the following shell command:

```npm test```

## Notes

I assumed the following while authoring this challenge:

__Relative to time constraints...__

* Begin with a very basic rule schema as objects, relative to the provided requirements. Abstract rules into respective classes as complexity increases (e.g. subclassing rule types, conditions)
* Begin with a very basic total() function. As complexity increases, delegate totaling functionality to respective classes (e.g. promotion calculator, tax calculator, shipping calculator, etc.)
* Assume price as `Integer` in dollars for this example. In a real world situation, this value would be coerced to cents to mitigate any issues for non-whole numbers if `Float` point-decimal were to be implemented