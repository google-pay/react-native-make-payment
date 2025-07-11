/*
 * Copyright 2023 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.makepayment

import com.facebook.react.bridge.*
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

/**
 * Helper for converting between JSON and React Native ReadableMap.
 */
object Convert {
    @Throws(JSONException::class)
    fun jsonStringToMap(json: String): WritableMap {
        return jsonToMap(JSONObject(json))
    }

    @Throws(JSONException::class)
    fun mapToJson(readableMap: ReadableMap): JSONObject {
        val jsonObject = JSONObject()
        val iterator = readableMap.keySetIterator()
        while (iterator.hasNextKey()) {
            val key = iterator.nextKey()
            when (readableMap.getType(key)) {
                ReadableType.Null -> jsonObject.put(key, JSONObject.NULL)
                ReadableType.Boolean -> jsonObject.put(key, readableMap.getBoolean(key))
                ReadableType.Number -> jsonObject.put(key, readableMap.getDouble(key))
                ReadableType.String -> jsonObject.put(key, readableMap.getString(key))
                ReadableType.Map -> {
                    val map = readableMap.getMap(key)
                    jsonObject.put(key, map?.let { mapToJson(it) } ?: JSONObject.NULL)
                }
                ReadableType.Array -> {
                    val array = readableMap.getArray(key)
                    jsonObject.put(key, array?.let { arrayToJson(it) } ?: JSONObject.NULL)
                }
            }
        }
        return jsonObject
    }

    @Throws(JSONException::class)
    fun arrayToJson(readableArray: ReadableArray?): JSONArray {
        val array = JSONArray()
        if (readableArray == null) {
            return array
        }
        for (i in 0 until readableArray.size()) {
            when (readableArray.getType(i)) {
                ReadableType.Null -> array.put(JSONObject.NULL)
                ReadableType.Boolean -> array.put(readableArray.getBoolean(i))
                ReadableType.Number -> array.put(readableArray.getDouble(i))
                ReadableType.String -> {
                    val str = readableArray.getString(i)
                    array.put(str ?: JSONObject.NULL)
                }
                ReadableType.Map -> {
                    val map = readableArray.getMap(i)
                    array.put(map?.let { mapToJson(it) } ?: JSONObject.NULL)
                }
                ReadableType.Array -> {
                    val nestedArray = readableArray.getArray(i)
                    array.put(nestedArray?.let { arrayToJson(it) } ?: JSONObject.NULL)
                }
            }
        }
        return array
    }

    @Throws(JSONException::class)
    private fun jsonToMap(jsonObject: JSONObject): WritableMap {
        val map = WritableNativeMap()
        val iterator = jsonObject.keys()
        while (iterator.hasNext()) {
            val key = iterator.next()
            val value = jsonObject[key]
            when (value) {
                is JSONObject -> map.putMap(key, jsonToMap(value))
                is JSONArray -> map.putArray(key, jsonToArray(value))
                is Boolean -> map.putBoolean(key, value)
                is Int -> map.putInt(key, value)
                is Double -> map.putDouble(key, value)
                is String -> map.putString(key, value)
                else -> map.putString(key, value.toString())
            }
        }
        return map
    }

    @Throws(JSONException::class)
    fun jsonToArray(jsonArray: JSONArray): WritableArray {
        val array = WritableNativeArray()
        for (i in 0 until jsonArray.length()) {
            val value = jsonArray[i]
            when (value) {
                is JSONObject -> array.pushMap(jsonToMap(value))
                is JSONArray -> array.pushArray(jsonToArray(value))
                is Boolean -> array.pushBoolean(value)
                is Int -> array.pushInt(value)
                is Double -> array.pushDouble(value)
                is String -> array.pushString(value)
                else -> array.pushString(value.toString())
            }
        }
        return array
    }
}
