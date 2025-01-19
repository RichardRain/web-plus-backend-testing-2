import { PostsService } from "./posts.service";

describe("PostsService", () => {
	let postsService: PostsService;

	beforeEach(() => {
		postsService = new PostsService();
	});

	describe(".findMany", () => {
		const posts = [
			{ text: "Post 1" },
			{ text: "Post 2" },
			{ text: "Post 3" },
			{ text: "Post 4" },
		];

		const expectedPosts = [
			{ id: "1", text: "Post 1" },
			{ id: "2", text: "Post 2" },
			{ id: "3", text: "Post 3" },
			{ id: "4", text: "Post 4" },
		];

		beforeEach(() => {
			posts.forEach((post) => postsService.create(post));
		});

		it("should return all posts if called without options", () => {
			const foundPosts = postsService.findMany();
			expect(foundPosts).toEqual(expectedPosts);
		});

		it("should return correct posts for skip and limit options", () => {
			const limitedPosts = postsService.findMany({ limit: 2 });
			const expectedResultLimited = expectedPosts.slice(0, 2);
			expect(limitedPosts).toEqual(expectedResultLimited);

			const skippedPosts = postsService.findMany({ skip: 2 });
			const expectedResultSkipped = expectedPosts.slice(2);
			expect(skippedPosts).toEqual(expectedResultSkipped);

			const skippedAndLimitedPosts = postsService.findMany({
				skip: 1,
				limit: 2,
			});
			const expectedResultSkippedAndLimited = expectedPosts.slice(1, 3);
			expect(skippedAndLimitedPosts).toEqual(expectedResultSkippedAndLimited);
		});

		// реализуйте недостающие тест-кейсы
		it("should return empty array if limit is not a number or a zero", () => {
			const limitedByNaNPosts = postsService.findMany({ limit: NaN });
			expect(limitedByNaNPosts).toEqual([]);

			const limitedByZeroPosts = postsService.findMany({ limit: 0 });
			expect(limitedByZeroPosts).toEqual([]);
		});

		it("should return an empty array if skip is greater than the number of posts", () => {
			const result = postsService.findMany({ skip: 10 });
			expect(result).toEqual([]);
		});

		it("should return an empty array if skip and limit are both greater than the number of posts", () => {
			const result = postsService.findMany({ skip: 5, limit: 5 });
			expect(result).toEqual([]);
		});
	});
});
