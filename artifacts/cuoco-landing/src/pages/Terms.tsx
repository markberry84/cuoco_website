import { LegalPage, type LegalDoc } from "@/components/LegalPage";
import doc from "@/content/legal/terms.json";

export default function Terms() {
  return <LegalPage doc={doc as LegalDoc} />;
}
