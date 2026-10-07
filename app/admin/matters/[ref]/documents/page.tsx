import { notFound } from "next/navigation";
import { getCaseDetail } from "@/lib/admin/queries/cases";
import { formatDateTime, formatShortDate } from "@/lib/admin/utils/dates";
import { FileText, Download, Upload, FileCheck, Lock } from "lucide-react";

interface DocumentsProps {
  params: Promise<{ ref: string }>;
}

export default async function MatterDocumentsPage({ params }: DocumentsProps) {
  const { ref } = await params;
  const detail = getCaseDetail(ref);

  if (!detail) {
    notFound();
  }

  const { matter, documents } = detail;

  const docCategoryLabels: Record<string, string> = {
    REPORT: "Investigation Report",
    EVIDENCE: "Evidential Attachment",
    CLIENT_UPLOAD: "Client Instruction / Upload",
    INTERNAL: "Internal Working Document",
    INVOICE: "Commercial Document",
    PROOF_OF_SERVICE: "Court / Legal Document",
    OTHER: "Administrative Document",
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-admin-border pb-4">
        <div>
          <h2 className="text-base font-medium text-admin-text">Document Vault & Provenance Schedule</h2>
          <p className="text-xs text-admin-text-muted mt-0.5">
            Legal documents, letters of instruction, research disclosures, and working drafts stored in encrypted storage.
          </p>
        </div>
        <button className="px-3 py-1.5 text-xs font-mono bg-admin-surface border border-admin-border hover:border-admin-accent rounded-xs transition-colors text-admin-text flex items-center gap-1.5">
          <Upload className="w-3.5 h-3.5 text-admin-accent" />
          Upload Document
        </button>
      </div>

      {documents.length === 0 ? (
        <div className="bg-white border border-admin-border rounded-sm p-8 text-center space-y-3">
          <FileText className="w-8 h-8 text-admin-text-faint mx-auto" />
          <h3 className="text-sm font-medium text-admin-text">No Documents Attached</h3>
          <p className="text-xs text-admin-text-muted max-w-md mx-auto">
            Upload formal letters of instruction, court pleadings, or registry certificates.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-admin-border rounded-sm shadow-admin-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-admin-border bg-admin-surface/60 font-mono text-[10px] uppercase text-admin-text-faint">
                  <th className="p-3">Document Title</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Filename</th>
                  <th className="p-3">Size</th>
                  <th className="p-3">Version</th>
                  <th className="p-3">Uploaded Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border-subtle">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-admin-surface/30 transition-colors">
                    <td className="p-3 max-w-sm">
                      <p className="font-semibold text-admin-text">{doc.title}</p>
                      {doc.description && (
                        <p className="text-[11px] text-admin-text-muted line-clamp-1 mt-0.5">
                          {doc.description}
                        </p>
                      )}
                    </td>
                    <td className="p-3">
                      <span className="font-mono text-[11px] px-2 py-0.5 bg-admin-surface border border-admin-border rounded-xs text-admin-text-secondary">
                        {docCategoryLabels[doc.document_type] || doc.document_type}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-admin-text-secondary text-[11px]">
                      {doc.original_filename}
                    </td>
                    <td className="p-3 font-mono text-admin-text-muted">
                      {(doc.file_size / 1024).toFixed(0)} KB
                    </td>
                    <td className="p-3 font-mono text-admin-text-secondary">
                      v{doc.version || 1}.0
                    </td>
                    <td className="p-3 font-mono text-admin-text-muted">
                      {formatShortDate(doc.uploaded_at)}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        title="Download Document"
                        className="p-1.5 text-admin-text-muted hover:text-admin-accent hover:bg-admin-surface rounded-xs transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
