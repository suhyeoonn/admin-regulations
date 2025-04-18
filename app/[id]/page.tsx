import ContentArea from "@/components/content-area";

export default async function RegulationPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  return <ContentArea treeId={id} />;
}
