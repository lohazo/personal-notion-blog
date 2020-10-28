import Link from "next/link";

const NOTION_BLOG_ID = "925c61fb9e3d41139e440100f8ea46cb";

export type Post = {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`,
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  console.log("getStaticProps -> posts", posts);

  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="page">
      {/*Main page content*/}
      <main>
        <div className="wrapper">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
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
          {/* <h1>Overdeveloped</h1> */}
          <div className="content">
            {posts.map((post) => (
              <article key={post.id}>
                <header>
                  <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                      <h3
                        style={{
                          marginBottom: "0.4375rem",
                          fontSize: "1.75rem",
                          fontWeight: "bold",
                        }}
                      >
                        {post.title}
                      </h3>
                      <small>posted on {post.date}</small>
                    </a>
                  </Link>
                </header>
                <p style={{ margin: "6px 0" }}>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
