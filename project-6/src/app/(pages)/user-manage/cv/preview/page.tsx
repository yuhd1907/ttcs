"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Document, Page, pdfjs } from "react-pdf";
import { FaArrowLeft } from "react-icons/fa";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure the worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFViewer() {
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("fileUrl");

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [error, setError] = useState<string | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error) {
    setError(error.message);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center min-h-[500px] w-full">
      {error && (
        <div className="text-red-500 font-medium my-10 text-center">
          Lỗi tải file: {error}
          <p className="text-sm mt-2 font-normal text-gray-600">Đảm bảo file PDF của bạn không bị hỏng và không chứa mật khẩu bảo vệ.</p>
        </div>
      )}
      
      {!fileUrl ? (
        <div className="text-gray-500 my-10">Không tìm thấy file để xem trước.</div>
      ) : (
        <>
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="my-10 text-gray-500 font-medium flex items-center gap-2">
               <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
               Đang tải dữ liệu PDF...
            </div>}
            className="border border-gray-200 shadow-sm"
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={800}
              className="max-w-full"
            />
          </Document>

          {numPages && (
            <div className="flex items-center gap-4 mt-6">
              <button
                disabled={pageNumber <= 1}
                onClick={() => changePage(-1)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Trang trước
              </button>
              <span className="text-gray-600 font-medium text-sm">
                Trang {pageNumber} / {numPages}
              </span>
              <button
                disabled={pageNumber >= numPages}
                onClick={() => changePage(1)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                Trang sau
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function PreviewPage() {
  const router = useRouter();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium bg-white px-4 py-2 rounded shadow-sm border border-gray-200"
          >
            <FaArrowLeft />
            <span>Quay lại</span>
          </button>
        </div>

        <Suspense fallback={<div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center min-h-[500px] text-gray-500">Đang khởi tạo trình xem PDF...</div>}>
          <PDFViewer />
        </Suspense>
      </div>
    </div>
  );
}
