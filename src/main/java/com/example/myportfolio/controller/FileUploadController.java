package com.example.myportfolio.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/upload")
@CrossOrigin(origins = "http://localhost:5173")
public class FileUploadController {

    private final String UPLOAD_DIR = "uploads/";

    @PostMapping
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            // Create uploads directory if it doesn't exist
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Generate a unique file name to avoid collisions
            String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
            String fileExtension = "";
            int i = originalFileName.lastIndexOf('.');
            if (i > 0) {
                fileExtension = originalFileName.substring(i);
            }
            String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

            // Save the file locally
            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadPath.resolve(uniqueFileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            // Return the URL that the frontend can use to access the image
            String fileDownloadUri = "/uploads/" + uniqueFileName;
            return ResponseEntity.ok(Map.of("imageUrl", fileDownloadUri));

        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the file: " + ex.getMessage());
        }
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please select a file to upload.");
        }

        try {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Always save as 'resume.pdf' so the public link remains constant
            String fileName = "resume.pdf";

            try (InputStream inputStream = file.getInputStream()) {
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);
            }

            String fileDownloadUri = "/uploads/" + fileName;
            return ResponseEntity.ok(Map.of("resumeUrl", fileDownloadUri));

        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Could not upload the resume: " + ex.getMessage());
        }
    }

    @GetMapping("/resume")
    public ResponseEntity<?> getResume() {
        try {
            Path filePath = Paths.get(UPLOAD_DIR).resolve("resume.pdf");
            if (!Files.exists(filePath)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .contentType(MediaType.TEXT_HTML)
                        .body(getStyledNotFoundHtml());
            }

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .contentType(MediaType.APPLICATION_PDF)
                        .body(resource);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .contentType(MediaType.TEXT_HTML)
                        .body(getStyledNotFoundHtml());
            }
        } catch (MalformedURLException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.TEXT_HTML)
                    .body("<html><body><h1 style='color:red;'>Error retrieving resume</h1></body></html>");
        }
    }

    private String getStyledNotFoundHtml() {
        return "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>Resume Not Found</title>\n" +
                "    <script src=\"https://cdn.tailwindcss.com\"></script>\n" +
                "    <style>\n" +
                "        body { background-color: #0f172a; color: #f8fafc; font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; }\n"
                +
                "        .glass-card { background-color: rgba(30, 41, 59, 0.5); backdrop-filter: blur(12px); border: 1px solid rgba(51, 65, 85, 0.5); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }\n"
                +
                "        .gradient-text { color: transparent; background-clip: text; -webkit-background-clip: text; background-image: linear-gradient(to right, #22d3ee, #3b82f6); }\n"
                +
                "    </style>\n" +
                "</head>\n" +
                "<body class=\"min-h-screen flex items-center justify-center p-4\">\n" +
                "    <div class=\"absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl\"></div>\n" +
                "    <div class=\"absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl\"></div>\n"
                +
                "    \n" +
                "    <div class=\"relative z-10 glass-card rounded-2xl p-10 max-w-lg w-full text-center\">\n" +
                "        <div class=\"inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800/80 mb-6 border border-slate-700\">\n"
                +
                "            <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-10 w-10 text-cyan-400\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\">\n"
                +
                "                <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" />\n"
                +
                "            </svg>\n" +
                "        </div>\n" +
                "        \n" +
                "        <h1 class=\"text-3xl font-extrabold mb-4\">Resume <span class=\"gradient-text\">Not Present</span></h1>\n"
                +
                "        <p class=\"text-slate-400 mb-8 leading-relaxed\">\n" +
                "            The requested resume document has not been uploaded yet or is currently unavailable.\n" +
                "        </p>\n" +
                "        \n" +
                "        <div class=\"flex flex-col sm:flex-row gap-4 justify-center\">\n" +
                "            <a href=\"http://localhost:5173/\" class=\"inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium border border-slate-700 transition-colors gap-2\">\n"
                +
                "                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n"
                +
                "                    <path fill-rule=\"evenodd\" d=\"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z\" clip-rule=\"evenodd\" />\n"
                +
                "                </svg>\n" +
                "                Go Back to Portfolio\n" +
                "            </a>\n" +
                "            <button onclick=\"window.print()\" class=\"inline-flex items-center justify-center px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-medium shadow-lg shadow-cyan-500/20 transition-colors gap-2\">\n"
                +
                "                <svg xmlns=\"http://www.w3.org/2000/svg\" class=\"h-5 w-5\" viewBox=\"0 0 20 20\" fill=\"currentColor\">\n"
                +
                "                    <path fill-rule=\"evenodd\" d=\"M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z\" clip-rule=\"evenodd\" />\n"
                +
                "                </svg>\n" +
                "                Save Page\n" +
                "            </button>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</body>\n" +
                "</html>";
    }
}
