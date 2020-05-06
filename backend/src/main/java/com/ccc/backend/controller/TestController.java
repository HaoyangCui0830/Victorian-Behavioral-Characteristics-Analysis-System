package com.ccc.backend.controller;

import com.ccc.backend.pojo.Sentiment;
import com.ccc.backend.pojo.Sofa;
import com.ccc.backend.pojo.Suburb;
import com.ccc.backend.dao.CouchdbCRUD;
import com.ccc.backend.dao.SofaRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TestController {


    @Autowired
    CouchdbCRUD couchdbCRUD;

    @Autowired
    SofaRespository sofaRespository;

    @RequestMapping(value = "/test", method = RequestMethod.POST)
    public String newSofa(@RequestBody Sofa sofa) throws Exception{
        System.out.println(sofa);
        sofaRespository.add(sofa);
        return sofa.getId();
    }

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public List<Sofa> get(){
        return sofaRespository.getAll();
    }

    @RequestMapping(value = "/test/{color}", method = RequestMethod.GET)
    public List<Sofa> getByColor(@PathVariable String color){
        System.out.println(color);
//        return sofaRespository.findByColor(color);
        return null;
    }

    @RequestMapping(value = "/suburb", method = RequestMethod.GET)
    public List<Suburb> getSuburbInfo(){
        Sentiment sentiment = new Sentiment();
        sentiment.setPolarity((float) 0.55);
        sentiment.setSubjectivity((float) 0.2);
        Suburb suburb = new Suburb();
        suburb.setSuburb("Abbosford");
        suburb.setSentiment(sentiment);
        Suburb suburb1 = new Suburb();
        suburb1.setSuburb("Aberfeldie");
        suburb1.setSentiment(sentiment);
        List<Suburb> result = new ArrayList<>();
        result.add(suburb);
        result.add(suburb1);
        return result;
    }


//    @RequestMapping(value = "/user",method = RequestMethod.POST)
//    public boolean addUser(User user){
//        System.out.println("开始新增用户");
//        return userService.addUser(user);
//    }
//
//    @RequestMapping(value = "/user",method =RequestMethod.PUT )
//    public boolean updateUser(User user){
//        System.out.println("开始更新用户");
//        return userService.updateUser(user);
//    }
//    @RequestMapping(value = "/user",method = RequestMethod.DELETE)
//    public boolean delete(@RequestParam(value = "id",required = true) int id){
//        System.out.println("开始删除用户");
//        return userService.deleteUser(id);
//    }
//    @RequestMapping(value = "/user",method = RequestMethod.GET)
//    public User findByUserName(@RequestParam(value = "userName",required = true) String userName){
//        System.out.println("开始根据用户名字进行查找");
//        return userService.findUserByName(userName);
//    }
//    @RequestMapping(value = "/findall",method = RequestMethod.GET)
//    public List<User> findAll(){
//        System.out.println("开始查找所有用户");
//        return userService.findAll();
//    }
}
