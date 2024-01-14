package com.example.artshop.service;

import com.example.artshop.dao.RoleDao;
import com.example.artshop.dao.UserDao;
import com.example.artshop.entity.Role;
import com.example.artshop.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public User registerNewUser(User user) {

        try {


            if (userDao.existsByUserName(user.getUserName())) {
                throw new IllegalArgumentException("Numele de utilizator este deja înregistrat.");
            }

            if (user.getUserName() == null || user.getUserPassword() == null) {
                throw new IllegalArgumentException("Nume de utilizator și parolă sunt obligatorii.");
            }


            Role role = roleDao.findById("User").orElseThrow(() -> new IllegalStateException("Rolul 'User' nu există în baza de date."));

            Set<Role> roleSet = new HashSet<>();
            roleSet.add(role);
            user.setRole(roleSet);

            String password = getEncodedPassword(user.getUserPassword());
            user.setUserPassword(password);


            return userDao.save(user);

        } catch (Exception ex) {

            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public void initRoleAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default role for newly created record");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUserFirstName("admin");
        adminUser.setUserLastName("admin");
        adminUser.setUserName("admin123");
        adminUser.setUserPassword(getEncodedPassword("admin@pass"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRole(adminRoles);
        userDao.save(adminUser);

        User user = new User();
        user.setUserFirstName("Iuliana");
        user.setUserLastName("Barbalata");
        user.setUserName("iuli123");
        user.setUserPassword(getEncodedPassword("iuli@pass"));
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(userRole);
        user.setRole(userRoles);
        userDao.save(user);

    }


}
