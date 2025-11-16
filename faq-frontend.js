document.addEventListener("DOMContentLoaded", function () {

    const faqs = document.querySelectorAll(".faq_block_faq");

    faqs.forEach(faq => {
        const answerBox = faq.querySelector(".faq_block_faq_answer_box");

        faq.addEventListener("click", function () {

            if (faq.classList.contains("open_faq")) {
                faq.classList.remove("open_faq");
                answerBox.style.maxHeight = null;
                return;
            }

            faqs.forEach(otherFaq => {
                otherFaq.classList.remove("open_faq");
                const otherAnswerBox = otherFaq.querySelector(".faq_block_faq_answer_box");
                if (otherAnswerBox) {
                    otherAnswerBox.style.maxHeight = null;
                }
            });

            faq.classList.add("open_faq");
            answerBox.style.maxHeight = answerBox.scrollHeight + "px";

        });
    });

});
