package com.ccc.backend.mapper;

import com.ccc.backend.pojo.HotWord;
import com.ccc.backend.pojo.HotWordSuburb;

import java.util.List;
import java.util.Map;

/**
 * @description: all hotword data
 */
public interface HotWordMapper {
    public List<HotWord> getAll();
    public Map<String, Integer> getSuburbByHotWord(String hotWord);
}
