"use client";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { UpdateBlogParams } from "@/types/types";

/* Blog更新処理 */
const updateBlog = async (data: UpdateBlogParams) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        id: data.id,
      }),
    });
    return await res.json();
  } catch (error) {
    console.error("接続エラーです", error);
  }
};

/* 特定のBlogを取得 */
const getBlogById = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`);
    const data = await res.json();
    return data.post;
  } catch (error) {
    toast.error("エラーが発生しました!!", { id: "1" });
  }
};

/* Blogの削除処理 */
const deleteBlog = async (id: number) => {
  try {
    const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return await data.post;
  } catch (error) {
    console.error("接続エラーです", error);
  }
};

function EditBlog({ params }: { params: { id: number } }) {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);
  const router = useRouter();

  /*更新ボタンが押下された際の処理 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("更新データを送信しています!! 🚀", { id: "1" });
      await updateBlog({
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        id: params.id,
      });
    }

    toast.success("データ更新が正常に行われました!!", { id: "1" });
    router.push("/");
    router.refresh();
  };

  /*削除ボタンが押下された際の処理 */
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.loading("削除中です", { id: "1" });
    await deleteBlog(params.id);
    toast.success("削除に成功しました!!!", { id: "1" });
    router.push("/");
    router.refresh();
  };
  /*初期化処理 */
  useEffect(() => {
    toast.loading("ブログを取得しています!! 🚀", { id: "1" });
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("データ取得に成功しました", { id: "1" });
        }
      })
      .catch(() => {
        toast.error("Error Fetching Blog", { id: "1" });
      });
  }, []);

  return (
    <>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            ブログの編集 🚀
          </p>
          <form onSubmit={handleSubmit}>
            <input
              ref={titleRef}
              placeholder="タイトルを入力"
              type="text"
              className="rounded-md px-4 w-full py-2 my-2"
            />
            <textarea
              ref={descriptionRef}
              placeholder="記事詳細を入力"
              className="rounded-md px-4 py-2 w-full my-2"
            ></textarea>
            <button className="font-semibold px-4 py-2 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
              更新
            </button>
            <button
              className="ml-2 font-semibold px-4 py-2 shadow-xl bg-red-400 rounded-lg m-auto hover:bg-slate-100"
              onClick={handleDelete}
            >
              削除
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditBlog;
