// Master Data Service - Tập trung các API calls cho dữ liệu tĩnh

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const FALLBACK_URL = "http://localhost:5000";

export interface ApiResponse<T> {
  data: T;
  error?: string;
  success: boolean;
}

class MasterDataService {
  private async fetchWithFallback<T>(
    primaryUrl: string,
    fallbackUrl?: string
  ): Promise<T> {
    try {
      const response = await fetch(primaryUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (primaryError) {
      if (fallbackUrl) {
        try {
          console.warn(`Primary URL failed (${primaryUrl}), trying fallback...`);
          const response = await fetch(fallbackUrl);
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return await response.json();
        } catch (fallbackError) {
          console.error("Both URLs failed:", { primaryError, fallbackError });
          throw new Error("Unable to fetch data from both sources");
        }
      }
      throw primaryError;
    }
  }

  async getCities() {
    return this.fetchWithFallback(
      `${BASE_URL}/api/public/master-data/cities`,
      `${FALLBACK_URL}/province/list`
    );
  }

  async getSkills() {
    return this.fetchWithFallback(
      `${BASE_URL}/api/public/master-data/skills`,
      `${FALLBACK_URL}/skills/list`
    );
  }

  async getJobFields() {
    return this.fetchWithFallback(
      `${BASE_URL}/api/public/master-data/fields`,
      `${FALLBACK_URL}/job_fields`
    );
  }

  async getSpecializations() {
    return this.fetchWithFallback(
      `${BASE_URL}/api/public/master-data/specializations`,
      `${FALLBACK_URL}/it_jobs`
    );
  }

  // Utility methods
  async getAllMasterData() {
    try {
      const [cities, skills, fields, specializations] = await Promise.all([
        this.getCities(),
        this.getSkills(),
        this.getJobFields(),
        this.getSpecializations(),
      ]);

      return {
        cities,
        skills,
        fields,
        specializations,
        success: true,
      };
    } catch (error) {
      console.error("Error fetching master data:", error);
      return {
        cities: [],
        skills: [],
        fields: [],
        specializations: [],
        success: false,
        error: "Không thể tải dữ liệu tĩnh",
      };
    }
  }
}

export const masterDataService = new MasterDataService();

