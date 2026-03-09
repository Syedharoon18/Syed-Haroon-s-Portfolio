package com.example.myportfolio.controller;

import com.example.myportfolio.entity.Contact;
import com.example.myportfolio.service.ContactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> submitMessage(@RequestBody Contact contact) {
        return ResponseEntity.ok(contactService.saveMessage(contact));
    }

    @GetMapping("/ping")
    public ResponseEntity<String> pingSystemFile() {
        try {
            String prop = System.getProperty("user.dir") + "/uploads/";
            java.nio.file.Path path = java.nio.file.Paths.get(prop);
            return ResponseEntity.ok("Success: " + prop + " -> Path created: " + path.toAbsolutePath().toString());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Exception on Paths.get: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllMessages() {
        return ResponseEntity.ok(contactService.getAllMessages());
    }
}
