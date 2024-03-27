import { expect, describe, it} from 'vitest'
import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import '@testing-library/jest-dom'
import { FeedPage } from "../../src/pages/Feed/FeedPage";
import { getPosts } from "../../src/services/posts";
import { BrowserRouter, useNavigate } from "react-router-dom";

// Mocking the getPosts service
vi.mock("../../src/services/posts", () => {
	const getPostsMock = vi.fn();
	return { getPosts: getPostsMock };
});

// Mocking React Router's useNavigate function
vi.mock("react-router-dom", async () => {
	const actual = await vi.importActual('react-router-dom')
	const MockLink = ({to, children}) => <a href={to}>{children}</a>
	const navigateMock = vi.fn();
	const useNavigateMock = () => navigateMock;
	return {
		...actual,
		Link:MockLink,
		useNavigate: useNavigateMock
	}
});


describe("Feed Page", () => {
	// beforeEach(() => {
	// 	window.localStorage.removeItem("token");
	// });

	// it('renders correctly', () => {
	// 	window.localStorage.setItem("token", "testToken");
		
	// 	const mockPosts = [{ _id: "11", postedBy: {_id: '11', username: 'test_user1'}, message: "Test Post 1", username: "test_user1", createdAt: '2022-03-29T15:45:00Z', comments: [{createdAt: '2022-03-20T15:45:00Z'}], likes: []}
	// 	]
	// 	getPosts.mockResolvedValueOnce({ posts: mockPosts, token: 'mockToken' })

	// 	render(<FeedPage />, {wrapper: BrowserRouter});
		
	// 	window.localStorage.removeItem("token");
    //     window.localStorage.removeItem("user");
	// })

	it('calls getPosts on render', async () => {
		window.localStorage.setItem("token", "testToken");
		window.localStorage.setItem("user", JSON.stringify({_id: '11', username:'test_user1', image:'mockURL'}));
		const mockPosts = [{ _id: "11", postedBy: {_id: '11', username: 'test_user1'}, message: "Test Post 1", username: "test_user1", createdAt: '2022-03-29T15:45:00Z', comments: [{createdAt: '2022-03-20T15:45:00Z'}], likes: []}
		]

		getPosts.mockResolvedValueOnce({ posts: mockPosts, token: 'mockToken' })

		render(<FeedPage />, {wrapper: BrowserRouter});

		await waitFor(() => expect(getPosts).toHaveBeenCalledWith('testToken'));
		window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");
	})

	it("displays post in chronological order", async () => {
		window.localStorage.setItem("token", "testToken");
		window.localStorage.setItem("user", JSON.stringify({_id: '11', username:'test_user1', image:'mockURL'}));

		const mockPosts = [
			{ _id: "11", postedBy: {_id: '11', username: 'test_user1'}, message: "Test Post 1", username: "test_user1", createdAt: '2022-03-29T15:45:00Z', comments: [{createdAt: '2022-03-20T15:45:00Z'}], likes: []},
			{ _id: "12", postedBy: {_id: '12', username: 'test_user2'}, message: "Test Post 2", username: "test_user2", createdAt: '2022-03-28T15:45:00Z', comments: [{createdAt: '2022-03-19T15:45:00Z'}], likes: []},
			{ _id: "13", postedBy: {_id: '13', username: 'test_user3'}, message: "Test Post 3", username: "test_user3", createdAt: '2022-03-27T15:45:00Z', comments: [{createdAt: '2022-03-18T15:45:00Z'}], likes: []}

		];

		getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

		render(<FeedPage />, {wrapper: BrowserRouter});

		const post1 = await screen.findByText('Test Post 1');
		const post2 = await screen.findByText('Test Post 2');
		const post3 = await screen.findByText('Test Post 3');

		expect(post1).toBeInTheDocument();
		expect(post2).toBeInTheDocument();
		expect(post3).toBeInTheDocument();
		
		expect(post1.compareDocumentPosition(post2) & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);
		expect(post2.compareDocumentPosition(post3) & Node.DOCUMENT_POSITION_FOLLOWING).toBeGreaterThan(0);

		window.localStorage.removeItem("token");
        window.localStorage.removeItem("user");

	});

	// test("It displays posts in reverse chronologicle order", async () => {
	// 	window.localStorage.setItem("token", "testToken");

	// 	const mockPosts = [
	// 		{
	// 			_id: "11111",
	// 			message: "Test Post Old",
	// 			createdAt: "2022-01-30T15:39:22.550Z",
	// 		},
	// 		{
	// 			_id: "22222",
	// 			message: "Test Post New",
	// 			createdAt: "2024-01-30T15:39:22.550Z",
	// 		},
	// 		{
	// 			_id: "33333",
	// 			message: "Test Post Middle",
	// 			createdAt: "2023-01-30T15:39:22.550Z",
	// 		},
	// 	];

	// 	getPosts.mockResolvedValue({ posts: mockPosts, token: "newToken" });

	// 	render(<FeedPage />);
	// 	const post = await screen.findAllByRole("article");
	// 	const postTexts = post.map((p) => p.textContent);

	// 	expect(postTexts).toEqual([
	// 		"30/01/2024, 15:39:22Test Post Newlikes: ",
	// 		"30/01/2023, 15:39:22Test Post Middlelikes: ",
	// 		"30/01/2022, 15:39:22Test Post Oldlikes: "
	// 	]);
	// });

	// test("It navigates to login if no token is present", async () => {
	// 	render(<FeedPage />);
	// 	const navigateMock = useNavigate();
	// 	expect(navigateMock).toHaveBeenCalledWith("/login");
	// });
});
