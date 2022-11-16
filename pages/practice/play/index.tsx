import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";

export default function Play({ questions }) {
  return <div>Play</div>;
}

export const getServerSideProps: GetServerSideProps<{
  query: ParsedUrlQuery;
}> = async (ctx) => {
  const req = ctx.req;
  const referer = req.headers.referer.split("/");
  const url = `${referer[0]}//${referer[2]}`;
  const { type } = ctx.query;
  let questions = [];
  if (type == "random") {
    const { n, tags } = ctx.query;
    const res = await fetch(
      `${url}/api/question/generate?` +
        new URLSearchParams({
          type: type,
          n: String(n),
          tags: String(tags),
        })
    );

    console.log(await res.json());
  }

  return {
    props: {
      query: ctx.query,
      isProtected: true,
    },
  };
};
