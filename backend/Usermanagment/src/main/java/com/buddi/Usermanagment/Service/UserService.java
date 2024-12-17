package com.buddi.Usermanagment.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.buddi.Usermanagment.Dto.UserDto;
import com.buddi.Usermanagment.Entity.User;
import com.buddi.Usermanagment.Exception.DuplicateResourceException;
import com.buddi.Usermanagment.Exception.ResourceNotFoundException;
import com.buddi.Usermanagment.Repository.UserRepository;

@Service
	public class UserService {

	    @Autowired
	    private UserRepository userRepository;
	    
	    @Autowired
	    private ModelMapper modelMapper;

	    public List<UserDto> getAllUsers() {
	        return userRepository.findAll().stream()
	        		.map(user -> modelMapper.map(user, UserDto.class))
	        		.collect(Collectors.toList());
	    }

	    public UserDto createUser(UserDto userDto) {
	    	 Optional<User> existingUser = userRepository.findByEmail(userDto.getEmail());
	    	 
	         if (existingUser.isPresent()) {
	             throw new DuplicateResourceException("User with email " + userDto.getEmail() + " already exists.");
	         }
	         
	         User user = modelMapper.map(userDto, User.class);
	         User savedUser = userRepository.save(user);
	         return modelMapper.map(savedUser, UserDto.class);
	    }

	    public User updateUser(Long id, UserDto userDetails) {
	        User user = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User with ID " + id + " not found."));
	        
	        user.setName(userDetails.getName());
	        user.setEmail(userDetails.getEmail());
	        user.setPassword(userDetails.getPassword());
	        return userRepository.save(user);
	    }

	    public void deleteUser(Long id) {
	    	
	    	if (!userRepository.existsById(id)) {
	             throw new ResourceNotFoundException("User with ID " + id + " not found.");
	         }
	    	
	         userRepository.deleteById(id);
	    }

}
