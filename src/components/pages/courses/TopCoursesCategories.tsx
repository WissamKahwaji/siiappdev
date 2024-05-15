import CategoryImage from "./CategoryImage";

const TopCoursesCategories = () => {
  const categories = [
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg",
      text: "Design",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg",
      text: "Development",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg",
      text: "Marketing",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg",
      text: "IT & Software",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg",
      text: "Personal Development",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg",
      text: "Business",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg",
      text: "Photography",
    },
    {
      imagePath:
        "https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg",
      text: "Music",
    },
  ];
  return (
    <div className="mt-8 mx-4 md:mx-16 font-header flex flex-col space-y-4 items-start justify-start">
      <h2 className="text-xl md:text-2xl font-bold text-navBackground">
        Top Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 w-full">
        {categories.map((item, index) => (
          <CategoryImage
            key={index}
            imgPath={item.imagePath}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCoursesCategories;
