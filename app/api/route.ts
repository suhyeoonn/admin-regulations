export async function GET() {
  const categories = [
    {
      id: "cat1",
      name: "인사 규정",
      children: [
        { id: "cat1-1", name: "근무 규정" },
        { id: "cat1-2", name: "휴가 규정" },
        { id: "cat1-3", name: "급여 규정" },
      ],
    },
    {
      id: "cat2",
      name: "재무 규정",
      children: [
        { id: "cat2-1", name: "회계 규정" },
        { id: "cat2-2", name: "구매 규정" },
      ],
    },
    {
      id: "cat3",
      name: "보안 규정",
      children: [
        { id: "cat3-1", name: "정보보안 규정" },
        { id: "cat3-2", name: "시설보안 규정" },
      ],
    },
  ];

  return Response.json(categories);
}
