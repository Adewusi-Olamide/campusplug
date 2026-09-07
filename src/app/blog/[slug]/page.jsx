// "use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./page.css";

const posts = [
{
slug: "how-to-study-smarter-and-not-just-harder",
title: "How to Study Smarter and Not Just Harder",
excerpt:
"Discover simple study strategies that can help you understand topics faster and remember what you learn for longer.",
category: "Study Tips",
date: "August 28, 2026",
readTime: "5 min read",
image: "/images/studysmarter.jpg",
},
{
slug: "how-to-prepare-for-your-next-exam",
title: "How to Prepare for Your Next Exam",
excerpt:
"A practical guide to organizing your revision, managing your time, and walking into your next exam prepared.",
category: "Exams",
date: "August 24, 2026",
readTime: "6 min read",
image: "/images/prepare.jpg",
},
{
slug: "5-ways-to-stay-focused-while-studying",
title: "5 Ways to Stay Focused While Studying",
excerpt:
"Struggling to concentrate? Try these simple techniques to make your study sessions more productive.",
category: "Productivity",
date: "August 20, 2026",
readTime: "4 min read",
image: "/images/focus.jpg",
},
{
slug: "why-flashcards-are-great-for-revision",
title: "Why Flashcards Are Great for Revision",
excerpt:
"Learn how active recall and flashcards can make revision more effective and less stressful.",
category: "Learning",
date: "August 17, 2026",
readTime: "4 min read",
image: "/images/flashcard.jpg",
},
{
slug: "building-better-study-habits",
title: "Building Better Study Habits",
excerpt:
"Small, consistent habits can make a huge difference in your academic journey. Here's where to start.",
category: "Study Tips",
date: "August 12, 2026",
readTime: "5 min read",
image: "/images/studyinghabit.jpg",
},
{
slug: "how-to-manage-your-time-as-a-student",
title: "How to Manage Your Time as a Student",
excerpt:
"Balance classes, assignments, revision, and your personal life with a simple approach to time management.",
category: "Productivity",
date: "August 8, 2026",
readTime: "7 min read",
image: "/images/time.jpg",
},
];

const page = async ({ params }) => {
const { slug } = await params;

const post = posts.find((item) => item.slug === slug);

if (!post) {
return (
<main className="article-not-found">
<h1>Article not found</h1>
<p>This article doesn't exist.</p>
<Link href="/blog">← Back to Blog</Link>
</main>
);
}

return (
<main className="article-page">
<article className="article-container">

    <Link href="/blog" className="article-back">
      ← Back to Blog
    </Link>

    <span className="article-category">
      {post.category}
    </span>

    <h1 className="article-title">
      {post.title}
    </h1>

    <p className="article-excerpt">
      {post.excerpt}
    </p>

    <div className="article-meta">
      <span>CampusPlug Team</span>
      <span>•</span>
      <span>{post.date}</span>
      <span>•</span>
      <span>{post.readTime}</span>
    </div>

    <div className="article-image">
      <Image
        src={post.image}
        alt={post.title}
        width={1200}
        height={700}
        priority
      />
    </div>

    <div className="article-content">

      <h2>Introduction</h2>

      <p>
        Studying effectively isn't simply about spending more hours
        with your books. It's about using your time wisely and choosing
        study methods that help you understand and remember what you
        learn.
      </p>

      <p>
        Whether you're preparing for an important examination or simply
        trying to improve your everyday studying, having the right
        approach can make your academic journey much easier.
      </p>

      <h2>Why Studying Smarter Matters</h2>

      <p>
        Everyone has a limited amount of time and energy. Instead of
        simply studying for longer, focus on making each study session
        more purposeful.
      </p>

      <p>
        Understanding what works for you can help you spend less time
        feeling overwhelmed and more time actually learning.
      </p>

      <h2>Practical Tips</h2>

      <p>
        Start each study session with a clear goal. Break larger topics
        into smaller sections and focus on understanding the material
        rather than simply trying to memorize everything at once.
      </p>

      <p>
        Take short breaks when necessary, review what you've learned,
        and regularly test yourself to see what you actually remember.
      </p>

      <h2>Final Thoughts</h2>

      <p>
        There isn't one perfect study method for everyone. Experiment
        with different approaches, find what works best for you, and
        stay consistent.
      </p>

      <p>
        Small improvements in the way you study can eventually make a
        big difference in your academic progress.
      </p>

    </div>
  </article>
</main>

);
};

export default page;
