import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import "./page.css";

const page = async ({ params }) => {
const { slug } = await params;

const article = articles.find((item) => item.slug === slug);

if (!article) {
notFound();
}

return (
<main className="article-page">
<article className="article-container">

    <Link href="/blog" className="article-back">
       Back to Blog
    </Link>

    <span className="article-category">
      {article.category}
    </span>

    <h1 className="article-title">
      {article.title}
    </h1>

    <p className="article-excerpt">
      {article.excerpt}
    </p>

    <div className="article-meta">
      <span>CampusPlug Team</span>
      <span>•</span>
      <span>{article.date}</span>
      <span>•</span>
      <span>{article.readTime}</span>
    </div>

    <div className="article-image">
      <Image
        src={article.image}
        alt={article.title}
        width={1200}
        height={700}
        priority
      />
    </div>

    <div className="article-content">
      {article.content.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>

          {section.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </section>
      ))}
    </div>

  </article>
</main>

);
};

export default page;
