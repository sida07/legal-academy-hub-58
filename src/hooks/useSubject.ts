
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useSubject = (year: string, examYear: string) => {
  return useQuery({
    queryKey: ['subject', year],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subjects')
        .select('*')
        .eq('name', `اختبار سنة ${examYear}`)
        .single();

      if (error) throw error;
      return data;
    }
  });
};
