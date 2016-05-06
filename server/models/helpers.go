package models

import "encoding/json"

// ToStringViaJSONMarshal Returns the JSON representation or panics with err
func ToStringViaJSONMarshal(i interface{}) string {
	json, err := json.Marshal(i)
	if err != nil {
		panic(err)
	}
	return string(json)
}
