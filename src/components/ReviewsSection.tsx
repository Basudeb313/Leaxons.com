import React, { useState } from 'react';
import { Star, CheckCircle, ThumbsUp, MessageSquare, Plus, X, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/catalog';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      productId: 'lx-general',
      productName: 'Leaxons Custom Merchandise',
      author: newAuthor.trim(),
      city: newCity.trim() || 'India',
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Outstanding Custom Merch!',
      comment: newComment.trim(),
      isVerifiedBuyer: true,
      helpfulCount: 1,
    };

    setReviewsList([newRev, ...reviewsList]);
    setIsModalOpen(false);
    setNewAuthor('');
    setNewCity('');
    setNewTitle('');
    setNewComment('');
  };

  const handleHelpful = (id: string) => {
    setReviewsList(
      reviewsList.map((r) => (r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
  };

  return (
    <section className="py-24 bg-white border-b border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Overall Metric */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-16 pb-12 border-b border-neutral-100">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Real Experiences • 10,000+ Happy Customers</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-neutral-950">
              Trusted by Creators, Startups & Gift Seekers across India.
            </h2>
            <p className="mt-3 text-base text-neutral-600">
              From college fests in Delhi to tech startups in Bengaluru, creators trust Leaxons for color accuracy and heavy-duty fabric.
            </p>
          </div>

          {/* Metric Summary Box */}
          <div className="bg-[#fafafa] rounded-3xl p-6 sm:p-8 border border-neutral-200/80 flex flex-col items-center justify-center text-center">
            <div className="text-5xl font-black font-display text-neutral-950">
              4.9<span className="text-2xl text-neutral-400 font-normal">/5</span>
            </div>
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
              Based on 10,420+ Verified Orders
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors cursor-pointer"
            >
              Write a Review
            </button>
          </div>
        </div>

        {/* Customer Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div
              key={review.id}
              className="bg-[#fafafa] rounded-3xl p-6 sm:p-7 border border-neutral-200/80 hover:border-neutral-900 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Buyer Pill */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  {review.isVerifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified Order
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold text-neutral-900 mb-2">
                  "{review.title}"
                </h3>

                <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                  {review.comment}
                </p>

                {/* Optional photo attached */}
                {review.photos && review.photos.length > 0 && (
                  <div className="mb-4">
                    <img
                      src={review.photos[0]}
                      alt="Customer upload"
                      className="w-20 h-20 rounded-xl object-cover border border-neutral-200"
                    />
                  </div>
                )}
              </div>

              {/* Author Info and Helpful Button */}
              <div className="pt-4 border-t border-neutral-200/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-900">{review.author}</p>
                  <p className="text-[11px] text-neutral-400">{review.city} • {review.date}</p>
                </div>

                <button
                  onClick={() => handleHelpful(review.id)}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-neutral-950 bg-white border border-neutral-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.helpfulCount}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h3 className="text-xl font-bold font-display text-neutral-950">Share Your Experience</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="mt-4 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewRating(star)}
                      className="p-1"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">City / State</label>
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="e.g. Mumbai, MH"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Vibrant print & super soft cotton"
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-700 mb-1">Detailed Review</label>
                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the print quality, packaging, delivery speed..."
                  className="w-full text-sm p-3 rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-900 resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Submit Verified Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
