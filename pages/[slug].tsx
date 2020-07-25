import { NotionRenderer, BlockMapType } from "react-notion";

import { getAllPosts, Post } from "./";
import Link from "next/link";

export async function getStaticProps({
  params: { slug },
}: {
  params: { slug: string };
}) {
  // Get all posts again
  const posts = await getAllPosts();

  // Find the current blogpost by slug
  const post = posts.find((t) => t.slug === slug);

  const blocks = await fetch(
    `https://notion-api.splitbee.io/v1/page/${post!.id}`,
  ).then((res) => res.json());

  return {
    props: {
      blocks,
      post,
    },
  };
}

const BlogPost: React.FC<{ post: Post; blocks: BlockMapType }> = ({
  post,
  blocks,
}) => (
  <div className="page">
    <main>
      <div className="wrapper">
        <div style={{ marginBottom: 50 }}>
          <Link href="/">
            <h1
              style={{
                display: "inline",
                cursor: "pointer",
                color: "#b10000",
                textDecoration: "line-through",
              }}
            >
              Overdeveloped
            </h1>
          </Link>
        </div>
        <div className="content">
          <h1>{post.title}</h1>
          <NotionRenderer blockMap={blocks} />
        </div>
      </div>
    </main>
  </div>
);

export async function getStaticPaths() {
  const table = await getAllPosts();
  return {
    paths: table.map((row) => `/${row.slug}`),
    fallback: true,
  };
}

export default BlogPost;
