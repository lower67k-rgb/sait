document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('js-tg-form');

    if (!contactForm) return;

    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.textContent;
        const formData = new FormData(this);

        // валидация (простая проверка)
        if (!formData.get('name') || !formData.get('phone')) {
            alert('заполни, пожалуйста, имя и телефон!');
            return;
        }

        // состояние "в процессе"
        submitBtn.disabled = true;
        submitBtn.textContent = 'отправка...';

        try {
            const response = await fetch('send.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.status === 'success') {
                alert('супер, заявка улетела!');
                this.reset();
            } else {
                throw new Error(result.message || 'ошибка сервера');
            }
        } catch (error) {
            console.error('ошибка:', error);
            alert('упс, что-то пошло не так. попробуй еще раз.');
        } finally {
            // возвращаем кнопку в исходное состояние
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
        }
    });
});
