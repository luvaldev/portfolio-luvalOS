"use client"
import React, { useState } from "react"
import { BLOG_POSTS } from "../windowData"

export function BlogContent() {
  const [selectedPost, setSelectedPost] = useState<typeof BLOG_POSTS[0] | null>(null)
  const [filter, setFilter] = useState("Todos")

  const categories = ["Todos", "Ciberseguridad", "Linux", "Desarrollo Web", "Desarrollo"]
  const filtered = filter === "Todos" ? BLOG_POSTS : BLOG_POSTS.filter(p => p.category === filter)

  if (selectedPost) {
    return (
      <article className="max-w-2xl mx-auto py-4">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center gap-1.5 text-[12.5px] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors mb-5 group"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="group-hover:-translate-x-0.5 transition-transform">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver al blog
        </button>

        <div className="mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${selectedPost.color}20`, color: selectedPost.color }}>
            {selectedPost.category}
          </span>
        </div>
        <h1 className="text-2xl font-black text-[var(--color-text-main)] mb-2 leading-tight">{selectedPost.title}</h1>
        <div className="flex items-center gap-3 text-[12px] text-[var(--color-text-muted)] mb-6">
          <span>{selectedPost.date}</span>
          <span>·</span>
          <span>{selectedPost.readTime} de lectura</span>
        </div>

        <div className="prose prose-sm max-w-none">
          {selectedPost.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={i} className="text-[15px] font-bold text-[var(--color-text-main)] mt-4 mb-2">{para.replace(/\*\*/g, '')}</h3>
            }
            if (para.startsWith('- ')) {
              return (
                <ul key={i} className="space-y-1 mb-3">
                  {para.split('\n').map((line, j) => (
                    <li key={j} className="text-[14px] text-[var(--color-text-main)] leading-relaxed flex items-start gap-2">
                      <span className="text-[var(--color-accent)] mt-1.5 flex-shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
                    </li>
                  ))}
                </ul>
              )
            }
            return <p key={i} className="text-[14.5px] leading-relaxed text-[var(--color-text-main)] mb-3" dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}/>
          })}
        </div>
      </article>
    )
  }

  return (
    <div className="py-2">
      <div className="mb-5">
        <h1 className="text-xl font-black text-[var(--color-text-main)] mb-0.5">Blog</h1>
        <p className="text-sm text-[var(--color-text-muted)]">Pensamientos sobre código, linux y seguridad</p>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 rounded-full text-[12px] font-semibold transition-colors ${
              filter === cat
                ? "bg-[var(--color-accent)] text-white"
                : "bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map(post => (
          <button
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="w-full text-left group bg-[var(--color-os-bg)] border border-[var(--color-border-subtle)] rounded-xl p-5 hover:border-[var(--color-border-medium)] hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: `${post.color}20`, border: `1.5px solid ${post.color}40` }}
              >
                {post.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${post.color}15`, color: post.color }}>
                    {post.category}
                  </span>
                  <span className="text-[11px] text-[var(--color-text-muted)]">{post.readTime}</span>
                </div>
                <h2 className="text-[14.5px] font-bold text-[var(--color-text-main)] mb-1 group-hover:text-[var(--color-accent)] transition-colors leading-snug">{post.title}</h2>
                <p className="text-[12.5px] text-[var(--color-text-muted)] leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[11px] text-[var(--color-text-muted)]">{post.date}</span>
                  <span className="text-[12px] font-semibold text-[var(--color-accent)] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Leer más
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
