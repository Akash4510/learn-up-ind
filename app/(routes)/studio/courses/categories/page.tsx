import { getCategories } from "@/actions/category";
import { TitleBlock } from "@/components/title-block";
import { AddCategoryButton } from "./_components/add-category-button";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <TitleBlock
        title="Categories"
        subtitle="Add categories for your courses here"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-accent px-6 py-2 rounded-md w-full sm:w-fit"
          >
            <p className="font-medium">{category.name}</p>
          </div>
        ))}
      </div>

      <AddCategoryButton />
    </div>
  );
};

export default CategoriesPage;
