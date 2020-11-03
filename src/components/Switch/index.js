import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

const Switch = (props) => {
    const [toggle, setToggle] = useState(!!props.defaultValue);
    const { trueLabel, falseLabel, showLabel, onChange } = props;

    const onToggle = () => {
        setToggle(!toggle)
        onChange(toggle)
    }
    return (
        <View style={styles.toggleswitch}>
            <TouchableOpacity onPress={onToggle}>
                <View>
                    {!toggle ? (
                        <View>
                            <View style={styles.toggleFalseBack}>
                                <View style={styles.falseIndicator}></View>
                            </View>
                            {showLabel && <Text style={styles.falseLabel}>{falseLabel}</Text>}
                        </View>
                    ) : (
                            <View>
                                <View style={styles.toggleTrueBack}>
                                    <View style={styles.trueIndicator}></View>
                                </View>
                                {showLabel && <Text style={styles.trueLabel}>{trueLabel}</Text>}
                            </View>
                        )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default Switch;
