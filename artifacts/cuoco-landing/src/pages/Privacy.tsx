import { LegalPage, type LegalDoc } from "@/components/LegalPage";
import doc from "@/content/legal/privacy.json";

export default function Privacy() {
  return <LegalPage doc={doc as LegalDoc} />;
}
