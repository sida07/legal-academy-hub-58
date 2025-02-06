import { Badge } from "@/components/ui/badge";

interface Certificate {
  id: number;
  name: string;
  date: string;
  issuer: string;
}

interface CertificatesListProps {
  certificates: Certificate[];
}

export const CertificatesList = ({ certificates }: CertificatesListProps) => {
  return (
    <div className="space-y-4">
      {certificates.map((cert) => (
        <div key={cert.id} className="bg-white rounded-xl p-6 shadow-sm border border-[#E5DEFF] hover:shadow-md transition-all duration-300">
          <div className="flex justify-between items-start">
            <Badge className="bg-[#8B5CF6]">{cert.issuer}</Badge>
            <p className="text-sm text-[#7E69AB]">
              {new Date(cert.date).toLocaleDateString('ar-MA')}
            </p>
          </div>
          <h3 className="text-xl font-semibold mt-4 text-right text-[#6E59A5]">{cert.name}</h3>
        </div>
      ))}
    </div>
  );
};