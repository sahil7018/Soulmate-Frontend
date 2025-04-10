import React from "react";
import { useLocation, useParams } from "react-router";
import LoveJournalBlogBanner from "src/sections/LoveJounalBlog/LoveJournalBlogBanner";
import LoveJournalBlogContent from "src/sections/LoveJounalBlog/LoveJournalBlogContent";
import RelatedArticles from "src/sections/LoveJounalBlog/RelatedArticles";
import CommentSection from "src/sections/LoveJounalBlog/CommentSection";

function LoveJournalBlog() {
  let { id } = useParams();
  const { state } = useLocation();

  console.log("ID : ", id);
  console.log("State : ", state);

  return (
    <>
      <LoveJournalBlogBanner item={state} />
      <LoveJournalBlogContent />
      <CommentSection />
      <RelatedArticles />
    </>
  );
}

export default LoveJournalBlog;
