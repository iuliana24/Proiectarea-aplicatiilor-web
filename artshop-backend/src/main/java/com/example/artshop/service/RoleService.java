package com.example.artshop.service;

import com.example.artshop.dao.RoleDao;
import com.example.artshop.entity.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;
    public Role createNewRole(Role role){
        return roleDao.save(role);

    }
}
