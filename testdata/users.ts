export interface User {
    username: string;
    password: string;
    expectedResult: "success" | "failure";
}

export const users: User[] = [
    {
        username: "standard_user",
        password: "secret_sauce",
        expectedResult: "success"
    },
    {
        username: "locked_out_user",
        password: "secret_sauce",
        expectedResult: "failure"
    },
    {
        username: "problem_user",
        password: "secret_sauce",
        expectedResult: "success"
    },
    {
        username: "performance_glitch_user",
        password: "secret_sauce",
        expectedResult: "success"
    },
    {
        username: "error_user",
        password: "secret_sauce",
        expectedResult: "success"
    },
    {
        username: "visual_user",
        password: "secret_sauce",
        expectedResult: "success"
    }
];

