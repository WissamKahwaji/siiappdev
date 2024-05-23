const EnrollmentCourse = () => {
  return (
    <div className="flex flex-col justify-start items-start border-2 border-gray-300 rounded-lg px-3 py-5 font-header bg-seconBackground shadow-lg">
      <p className="text-navBackground font-bold text-2xl">
        $498{" "}
        <span className="ml-2 text-base line-through text-gray-400">$1500</span>
      </p>
      <p className="font-serif text-2xl font-bold mt-3">
        Subscribe to Sii’s top courses
      </p>
      <p className="text-sm text-gray-500 mt-3">
        Get this course, plus 11,000+ of our top-rated courses, with Personal
        Plan
      </p>
      <button className="mt-5 font-serif text-lg rounded-md py-2 w-full text-center bg-navBackground text-secondary">
        Enroll Now
      </button>
      <p className="text-gray-600 text-sm mx-auto mt-4">
        30-Day Money-Back Guarantee
      </p>
    </div>
  );
};

export default EnrollmentCourse;
