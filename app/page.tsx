import AdminRegulationsPage from "@/components/admin-regulations-page";

async function getCategories() {
  const response = await fetch(`${process.env.API_URL}/api`);
  return response.json();
}

export default async function Home() {
  const categories = await getCategories();
  return <AdminRegulationsPage categories={categories} />;
}
