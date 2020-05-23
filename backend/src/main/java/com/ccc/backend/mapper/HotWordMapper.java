package com.ccc.backend.mapper;

import com.ccc.backend.pojo.HotWord;
import com.ccc.backend.pojo.HotWordSuburb;

import java.util.List;
import java.util.Map;

/**
 * @description: TODO
 * @author: Xin(Shawn) Wu
 */
public interface HotWordMapper {
    public List<HotWord> getAll();
    public Map<String, Integer> getSuburbByHotWord(String hotWord);
}
