package com.buddi.Usermanagment.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.buddi.Usermanagment.Entity.User;
import com.buddi.Usermanagment.Service.UserService;
import com.buddi.Usermanagment.Dto.UserDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
@Validated
public class UserController {

    @Autowired
    private UserService userService;

    @Operation(summary = "Get all users", description = "Fetches all users from the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully fetched users"),
            @ApiResponse(responseCode = "500", description = "Internal server error")
        })
    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.getAllUsers();
    }

    @Operation(summary = "Create a user", description = "Creates a new user with the given details")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "User created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid input")
    })
    @PostMapping
    public UserDto createUser(@Valid @RequestBody UserDto userDto) {
        return userService.createUser(userDto);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody UserDto userDetails) {
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}

