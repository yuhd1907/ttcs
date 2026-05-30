import { useState, useEffect } from "react";
import { JobCategory, RoleOption, Specialization } from "@/interface/specialization.interface";

export const useRoles = () => {
  const [roleList, setRoleList] = useState<RoleOption[]>([]);
  const [categories, setCategories] = useState<JobCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Thử sử dụng backend API trước, nếu không được thì sử dụng local JSON server
    const fetchRoles = async () => {
      try {
        // Thử backend API đầu tiên
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
        const response = await fetch(`${backendUrl}/api/public/master-data/specializations`, {
          credentials: "include",
        });

        if (response.ok) {
          const data: Specialization[] = await response.json();

          // Group by category
          const categoryMap = new Map<string, Specialization[]>();
          data.forEach((spec) => {
            if (!categoryMap.has(spec.category)) {
              categoryMap.set(spec.category, []);
            }
            categoryMap.get(spec.category)!.push(spec);
          });

          // Convert to JobCategory format
          const categoryList: JobCategory[] = Array.from(categoryMap).map(([category, specs]) => ({
            category,
            id: category,
            roles: specs.map((spec) => ({
              name: spec.name,
              slug: spec.slug,
            })),
          }));

          setCategories(categoryList);

          // Extract all roles
          const allRoles = data.map((spec) => ({
            name: spec.name,
            slug: spec.slug,
          }));
          setRoleList(allRoles);
        } else {
          throw new Error("Backend API failed");
        }
      } catch (err) {
        try {
          // Fallback to local JSON server
          const response = await fetch("http://localhost:5000/it_jobs");
          const data = await response.json();

          const categoryData: JobCategory[] = Array.isArray(data) ? data : (data?.value ?? []);
          setCategories(categoryData);

          const allRoles = categoryData
            .flatMap((category) => category.roles ?? [])
            .map(
              (role: RoleOption): RoleOption => ({
                name: role.name,
                slug: role.slug,
              })
            );

          setRoleList(allRoles);
        } catch (fallbackErr) {
          console.error("Error fetching roles:", fallbackErr);
          setError("Không thể tải danh sách chuyên môn");
          setRoleList([]);
          setCategories([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, []);

  return { roleList, categories, loading, error };
};
