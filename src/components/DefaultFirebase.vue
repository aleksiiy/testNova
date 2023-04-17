<template>
    <div>
        <ul>
            <li v-for="(ar, index) of arr" :key="index">{{ ar }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export default defineComponent({

    data() {
        return {
            d: 1,
            arr: []
        }
    },

    async mounted() {
        const app = await initializeApp({
                apiKey: "AIzaSyC_WyfQ3zkaSMUDlULuKeqwQDlVhco82bg",
                authDomain: "zeelytest-1.firebaseapp.com",
                projectId: "zeelytest-1",
                storageBucket: "zeelytest-1.appspot.com",
                messagingSenderId: "367683722861",
                appId: "1:367683722861:web:bb9bbf4fde147292aa6964",
                measurementId: "G-2VR5QWQDFS"
            });

        const messaging = getMessaging(app);
        this.getTokenMethod(messaging);
        onMessage(messaging, (payload) => {
            console.log("DATA: ", payload);
        })
    },

    methods: {
        getTokenMethod(messaging: any) {
            return getToken(messaging, { vapidKey: 'BFUhHUaY1XkC8zBlmUxf020_x4KMqTiXt9ZOmdt4vKke-cbKvjjMefhxsYEZHcVz-zrcrsYYSDtgegVKV-P0m94' }).then((currentToken) => {
                if (currentToken) {
                    console.log("TOKEN:::", `"${currentToken}"`);
                } else {
                    console.log("tst");
                }
            });
        }
    }
})
</script>