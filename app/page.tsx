import Link from "next/link";
import { PostProps } from "@/types/types";

async function fetchAllBlog() {
  try {
    const res = await fetch(`http://localhost:3000/api/blog`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.log(error);
  }
}

const Home = async () => {
  const posts = await fetchAllBlog();

  return (
    <main className="w-full h-ful">
      <div className="md:w-2/4 sm:w-3/4 m-auto p-4 my-5 rounded-lg bg-violet-700 drop-shadow-xl">
        <h1 className="text-slate-200 text-center text-2xl font-extrabold">
          Full Stack Blog 📝
        </h1>
      </div>
      {/* Link */}
      <div className="flex my-5">
        <Link
          href={"/blog/add"}
          className=" md:w-1/6 sm:w-2/4 text-center rounded-md p-2 m-auto bg-slate-300 font-semibold"
        >
          ブログ新規作成
        </Link>
      </div>

      <div className="w-full flex flex-col justify-center items-center">
        {posts.map((post: PostProps) => {
          return (
            <div
              className="w-3/4 p-4 rounded-md mx-3 my-2 bg-slate-300 flex flex-col justify-center"
              key={post.id}
            >
              <div className="flex items-center my-3">
                <div className="mr-auto">
                  <h2 className="mr-auto font-semibold">{post.title}</h2>
                </div>
                <Link
                  href={`/blog/edit/${post.id}`}
                  className="px-4 py-1 text-center text-xl bg-slate-800 rounded-md font-semibold text-slate-200"
                >
                  編集
                </Link>
              </div>

              <div className="mr-auto my-1">
                <blockquote className="font-bold text-slate-600">
                  {new Date(post.date).toDateString()}
                </blockquote>
              </div>

              <div className="mr-auto my-1">
                <h2>{post.description}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
