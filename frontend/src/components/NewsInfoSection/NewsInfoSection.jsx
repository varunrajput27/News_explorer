const NewsInfoSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-[#f0f4f8] to-white py-24 px-6 text-gray-800 font-serif border-y border-gray-200">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600680116000-9b221d511bca?q=80&w=1374&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 drop-shadow-sm">
          The Power of Journalism
        </h2>

        <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto">
          In a world overwhelmed by noise, journalism cuts through the chaos — offering clarity,
          context, and truth. It shapes the narrative of our times.
        </p>

        <p className="text-base md:text-lg leading-relaxed text-gray-700 max-w-3xl mx-auto">
          Great journalism informs. Brave journalism exposes. Compassionate journalism uplifts.
          It’s not just about headlines — it’s about impact, awareness, and accountability.
        </p>

        <div className="relative max-w-2xl mx-auto bg-white/80 border-l-4 border-blue-600 pl-6 pr-4 py-4 italic text-gray-700 text-lg md:text-xl shadow-md rounded-md">
          “The press is the best instrument for enlightening the mind of man.”
          <div className="text-sm text-right mt-2 text-gray-500">— Thomas Jefferson</div>
        </div>
      </div>
    </section>
  );
};

export default NewsInfoSection;
