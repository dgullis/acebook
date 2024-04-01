
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { useNavigate, useParams } from "react-router-dom";
import { UserPage } from "../../src/pages/User/UserPage";
import { describe } from "vitest";
import { getUser } from "../../src/services/user";


// Mocking the getUser service
vi.mock("../../src/services/user", () => {
    const getUserMock = vi.fn();
    return { getUser: getUserMock };
});

// Mocking React Router's useNavigate and useParams function
vi.mock("react-router-dom", () => {
    const navigateMock = vi.fn();
    const paramsMock = { username: "test_user1" }
    const useNavigateMock = () => navigateMock; // Create a mock function for useNavigate
    const useParamsMock = () => paramsMock;
    return { useNavigate: useNavigateMock, useParams: useParamsMock };
});

// Mocking useParams function
// vi.mock('react-router-dom', () => {
//     const paramsMock = { username: "test_user1" }
//     const useParamsMock = () => paramsMock;
//     return { useParams: useParamsMock }
// });

describe('User Page', () => {
    beforeEach(() => {
        window.localStorage.removeItem("token");
        });

// TODO - Fix loads user page test. Mocking doesn't correctly load page
    // test('loads user page', async () => {
    //     window.localStorage.setItem("token", "testToken");
        
    //     const mockUser = [{ _id: "12345", username: "test_user1", email: "mock@test.com", friends:[{_id:"12346", email: "test@test.com"}]}];
        
    //     getUser.mockResolvedValue({ user: mockUser, token: "newToken" });

    //     render(<UserPage />);

    //     // const post = await screen.findByRole("heading");
    //     // expect(post.textContent).toEqual("User Page");
    //     console.log('Line 48')
    //     // const user = await screen.findByText("User Page");
    //     // expect(user.textContent).toEqual("User Page");
    // })

    test("It navigates to login if no token is present", async () => {
        render(<UserPage />);
        const navigateMock = useNavigate();
        expect(navigateMock).toHaveBeenCalledWith("/login");
    });

    test("if logged in can see user info", async () => {
        window.localStorage.setItem("token", "testToken");
    })
})
